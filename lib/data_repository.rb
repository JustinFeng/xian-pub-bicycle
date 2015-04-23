require 'httparty'

class DataRepository
  WS_URL = 'http://www.xazxc.com/service/IBikeSitesService?wsdl/findBikeSites'

  SOAP_REQUEST_XML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:q0="http://ws.itcast.cn/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <soapenv:Body> <q0:findBikeSites></q0:findBikeSites></soapenv:Body> </soapenv:Envelope>'

  def self.search_by_term term
    data.select do |station|
      station["location"].include?(term) || station["sitename"].include?(term)
    end
  end

  private

  def self.data
    response = HTTParty.post(WS_URL, body: SOAP_REQUEST_XML)
    JSON.parse(response.body.scan(/.*\<ns1:out\>(.*)\<\/ns1:out\>.*/)[0][0])
  end
end