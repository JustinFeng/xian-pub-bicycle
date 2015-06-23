require 'geokit'
require_relative 'cache'

Geokit::default_units = :meters

class DataRepository
  BAIDU_GEO_API = 'http://api.map.baidu.com/geoconv/v1/'

  BAIDU_AK = 'OKYmQIaqUsXLGsTkpoDyBB9g'

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

  private

  def self.data
    Cache.data
  end

  def self.to_baidu_coordinate lat, lng
    response = HTTParty.get("#{BAIDU_GEO_API}?coords=#{lng},#{lat}&ak=#{BAIDU_AK}")
    result = JSON.parse(response.body)

    return result['result'][0]['y'], result['result'][0]['x']
  end
end