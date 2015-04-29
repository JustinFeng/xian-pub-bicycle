require 'httparty'
require 'openssl'
require 'geokit'

Geokit::default_units = :meters

class DataRepository
  WS_URL = 'http://www.xazxc.com/service/IBikeSitesService?wsdl/findBikeSites'

  SOAP_REQUEST_XML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:q0="http://ws.itcast.cn/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <soapenv:Body> <q0:findBikeSites></q0:findBikeSites></soapenv:Body> </soapenv:Envelope>'

  @@data = nil
  @@cached_at = Time.now

  def self.search_by_term term
    data.select { |station| station["location"].include?(term) || station["sitename"].include?(term) }
  end

  def self.search_by_location lat, lng, distance
    user_loc = Geokit::LatLng.new(lat, lng)
    data.map { |station|
      station_loc = Geokit::LatLng.new(station["latitude"], station["longitude"])
      station.tap {|it| it["distance"] = user_loc.distance_to(station_loc) }
    }.select { |station|
      station["distance"] <= distance
    }.sort {|x,y|
      x["distance"] <=> y["distance"]
    }
  end

  def self.search_by_ids(ids)
    data.select { |station| ids.include? station["siteid"] }
  end

  private

  def self.data
    fetch if (@@data.nil? || Time.now - @@cached_at > 600)
    @@data
  end

  def self.fetch
    p 'Fetching...'
    response = HTTParty.post(WS_URL, body: SOAP_REQUEST_XML)
    @@data  = JSON.parse(response.body.scan(/.*\<ns1:out\>(.*)\<\/ns1:out\>.*/)[0][0])
    adjust_geocode
    @@cached_at = Time.now
  end

  def self.adjust_geocode
    @@data.map! do |station|
      station["latitude"] = (station["latitude"].to_f - 0.004696).to_s
      station["longitude"] = (station["longitude"].to_f - 0.008).to_s
      station
    end
  end
end