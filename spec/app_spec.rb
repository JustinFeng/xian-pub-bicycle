require './lib/app'

describe App do
  include Rack::Test::Methods

  def app
    App
  end

  describe 'GET /api' do
    context 'invalid query params' do
      let(:query_str) { 'blah' }

      it 'responds 400' do
        get "/api?query=#{query_str}"

        expect(last_response.status).to eq(400)
      end
    end
  end
end