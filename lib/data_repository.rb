require 'httparty'
require 'openssl'
require 'geokit'
require 'dalli'

Geokit::default_units = :meters

class DataRepository
  WS_URL = 'http://www.xazxc.com/service/IBikeSitesService?wsdl/findBikeSites'

  SOAP_REQUEST_XML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:q0="http://ws.itcast.cn/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <soapenv:Body> <q0:findBikeSites></q0:findBikeSites></soapenv:Body> </soapenv:Envelope>'

  BAIDU_GEO_API = 'http://api.map.baidu.com/geoconv/v1/'

  BAIDU_AK = 'OKYmQIaqUsXLGsTkpoDyBB9g'

  if ENV["MEMCACHEDCLOUD_SERVERS"]
    MEMCACHED_CLIENT = Dalli::Client.new(ENV["MEMCACHEDCLOUD_SERVERS"].split(','), :username => ENV["MEMCACHEDCLOUD_USERNAME"], :password => ENV["MEMCACHEDCLOUD_PASSWORD"])
  else
    MEMCACHED_CLIENT = Dalli::Client.new('localhost:11211')
  end

  def self.search_by_term term
    data.select { |station| station["location"].include?(term) || station["sitename"].include?(term) }
  end

  def self.search_by_location gps_lat, gps_lng, distance
    lat, lng = to_baidu_coordinate gps_lat, gps_lng
    user_loc = Geokit::LatLng.new(lat, lng)
    data.reduce([]) { |nearby_set, station|
      station_loc = Geokit::LatLng.new(station["latitude"], station["longitude"])
      site_distance = user_loc.distance_to(station_loc)

      if site_distance <= distance
        nearby_station = station.dup
        nearby_station["distance"] = site_distance
        nearby_set << nearby_station
      end

      nearby_set
    }.sort {|x,y|
      x["distance"] <=> y["distance"]
    }
  end

  def self.search_by_ids(ids)
    data.select { |station| ids.include? station["siteid"] }
  end

  def self.cache
    p 'Fetching...'
    response = HTTParty.post(WS_URL, body: SOAP_REQUEST_XML)
    p 'Caching...'
    MEMCACHED_CLIENT.set('data', response.body.scan(/.*\<ns1:out\>(.*)\<\/ns1:out\>.*/)[0][0])
  end

  private

  def self.data
    cache unless MEMCACHED_CLIENT.get('data')
    JSON.parse(MEMCACHED_CLIENT.get('data'))
  end

  def self.to_baidu_coordinate lat, lng
    response = HTTParty.get("#{BAIDU_GEO_API}?coords=#{lng},#{lat}&ak=#{BAIDU_AK}")
    result = JSON.parse(response.body)

    return result['result'][0]['y'], result['result'][0]['x']
  end
end