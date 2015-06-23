require 'httparty'
require 'dalli'

class Cache
  WS_URL = 'http://www.xazxc.com/service/IBikeSitesService?wsdl/findBikeSites'

  SOAP_REQUEST_XML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:q0="http://ws.itcast.cn/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <soapenv:Body> <q0:findBikeSites></q0:findBikeSites></soapenv:Body> </soapenv:Envelope>'

  if ENV["MEMCACHEDCLOUD_SERVERS"]
    MEMCACHED_CLIENT = Dalli::Client.new(ENV["MEMCACHEDCLOUD_SERVERS"].split(','), :username => ENV["MEMCACHEDCLOUD_USERNAME"], :password => ENV["MEMCACHEDCLOUD_PASSWORD"])
  else
    MEMCACHED_CLIENT = Dalli::Client.new('localhost:11211')
  end

  def self.cache
    p 'Fetching...'
    response = HTTParty.post(WS_URL, body: SOAP_REQUEST_XML)
    p 'Caching...'
    MEMCACHED_CLIENT.set('data', response.body.scan(/.*\<ns1:out\>(.*)\<\/ns1:out\>.*/)[0][0])
  end

  def self.data
    cache unless MEMCACHED_CLIENT.get('data')
    JSON.parse(MEMCACHED_CLIENT.get('data'))
  end
end