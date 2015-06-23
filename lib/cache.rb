require 'httparty'
require 'dalli'

class Cache
  WS_URL = 'http://www.xazxc.com/service/IBikeSitesService?wsdl/findBikeSites'

  SOAP_REQUEST_XML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:q0="http://ws.itcast.cn/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <soapenv:Body> <q0:findBikeSites></q0:findBikeSites></soapenv:Body> </soapenv:Envelope>'

  def self.cache
    p 'Fetching...'
    response = HTTParty.post(WS_URL, body: SOAP_REQUEST_XML)
    p 'Caching...'
    memcached_client.set('data', response.body.scan(/.*\<ns1:out\>(.*)\<\/ns1:out\>.*/)[0][0])
  end

  def self.data
    cache unless memcached_client.get('data')
    JSON.parse(memcached_client.get('data'))
  end

  private

  def self.memcached_client
    @@memcached_client ||= ENV["MEMCACHEDCLOUD_SERVERS"] ?
        Dalli::Client.new(ENV["MEMCACHEDCLOUD_SERVERS"].split(','), :username => ENV["MEMCACHEDCLOUD_USERNAME"], :password => ENV["MEMCACHEDCLOUD_PASSWORD"]) :
        Dalli::Client.new('localhost:11211')
  end
end