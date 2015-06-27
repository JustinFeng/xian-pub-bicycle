require 'geokit'
require_relative 'cache'

Geokit::default_units = :meters

class DataRepository
  BAIDU_GEO_API = 'http://api.map.baidu.com/geoconv/v1/'

  BAIDU_AK = 'OKYmQIaqUsXLGsTkpoDyBB9g'

  def self.search_by_term term
    data.select { |site| site["location"].include?(term) || site["sitename"].include?(term) }
  end

  def self.search_by_location gps_lat, gps_lng, distance
    lat, lng = to_baidu_coordinate gps_lat, gps_lng
    user_loc = Geokit::LatLng.new(lat, lng)
    data.reduce([]) { |nearby_set, site|
      site_loc = Geokit::LatLng.new(site["latitude"], site["longitude"])
      site_distance = user_loc.distance_to(site_loc)

      if site_distance <= distance
        nearby_site = site.dup
        nearby_site["distance"] = site_distance
        nearby_set << nearby_site
      end

      nearby_set
    }.sort {|x,y|
      x["distance"] <=> y["distance"]
    }
  end

  def self.search_by_ids(ids)
    data.select { |site| ids.include? site["siteid"] }
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