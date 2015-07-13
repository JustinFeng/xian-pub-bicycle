require_relative 'spec_helper'
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

    context 'valid query' do
      let(:query_str) { URI.encode('{}') }

      it 'responds 200' do
        get "/api?query=#{query_str}"

        expect(last_response.status).to eq(200)
      end

      it 'responds with allow cross domain headers' do
        get "/api?query=#{query_str}"

        expect(last_response.headers['Access-Control-Allow-Origin']).to eq('*')
      end

      it 'returns empty result' do
        get "/api?query=#{query_str}"

        expect(last_response.body).to eq('[]')
      end

      context 'query by ids' do
        let(:query_str) { URI.encode('{"ids":["1","2"]}') }

        before do
          allow(DataRepository).to receive(:search_by_ids)
        end

        it 'search with ids' do
          expect(DataRepository).to receive(:search_by_ids).with(%w(1 2))

          get "/api?query=#{query_str}"
        end
      end

      context 'query by term' do
        let(:query_str) { URI.encode('{"term":"abc"}') }

        before do
          allow(DataRepository).to receive(:search_by_term)
        end

        it 'search with keyword' do
          expect(DataRepository).to receive(:search_by_term).with('abc')

          get "/api?query=#{query_str}"
        end
      end

      context 'query by location' do
        before do
          allow(DataRepository).to receive(:search_by_location)
        end

        context 'with distance in number' do
          let(:query_str) { URI.encode('{"lat":123,"lng":123,"distance":123}') }

          it 'search with location' do
            expect(DataRepository).to receive(:search_by_location).with(123, 123, 123)

            get "/api?query=#{query_str}"
          end
        end

        context 'with distance in string' do
          let(:query_str) { URI.encode('{"lat":123,"lng":123,"distance":"123"}') }

          it 'search with location' do
            expect(DataRepository).to receive(:search_by_location).with(123, 123, 123)

            get "/api?query=#{query_str}"
          end
        end

        context 'without distance' do
          let(:query_str) { URI.encode('{"lat":123,"lng":123}') }

          it 'search with location with default distance' do
            expect(DataRepository).to receive(:search_by_location).with(123, 123, 1000)

            get "/api?query=#{query_str}"
          end
        end
      end
    end
  end
end