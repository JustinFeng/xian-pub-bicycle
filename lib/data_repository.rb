require 'httparty'

class DataRepository
  WS_URL = 'http://www.xazxc.com/service/IBikeSitesService?wsdl/findBikeSites'

  SOAP_REQUEST_XML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:q0="http://ws.itcast.cn/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <soapenv:Body> <q0:findBikeSites></q0:findBikeSites></soapenv:Body> </soapenv:Envelope>'

  @@data = nil
  @@cached_at = Time.now

  def self.search_by_term term
    data.select do |station|
      station["location"].include?(term) || station["sitename"].include?(term)
    end
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
    @@cached_at = Time.now
  end
end