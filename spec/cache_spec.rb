require_relative 'spec_helper'
require './lib/cache'

describe Cache do
  subject { Cache }

  describe '#cache' do
    let(:soap_response) { double(body: '<ns1:out>results</ns1:out>') }

    before do
      allow(HTTParty).to receive(:post).and_return(soap_response)
    end

    it 'caches data' do
      expect_any_instance_of(Dalli::Client).to receive(:set).with('data', 'results')

      subject.cache
    end
  end

  describe '#data' do
    context 'data has been cached' do
      before do
        allow_any_instance_of(Dalli::Client).to receive(:get).with('data').and_return('{"key": "value"}')
      end

      it 'returns data cached' do
        expect(subject.data).to eq({'key' => 'value'})
      end
    end

    context 'data has not been cached' do
      before do
        allow_any_instance_of(Dalli::Client).to receive(:get).with('data').and_return(nil, '{"key": "value"}')
      end

      it 'returns data cached' do
        expect(subject).to receive(:cache)
        expect(subject.data).to eq({'key' => 'value'})
      end
    end
  end
end