require_relative 'spec_helper'
require './lib/data_repository'

describe DataRepository do
  let(:data) do
    [
        {
            'emptynum' => '2',
            'latitude' => '34.001',
            'location' => 'C',
            'locknum' => '15',
            'longitude' => '108.001',
            'siteid' => '5001',
            'sitename' => 'D'
        },
        {
            'emptynum' => '1',
            'latitude' => '34',
            'location' => 'A',
            'locknum' => '30',
            'longitude' => '108',
            'siteid' => '5002',
            'sitename' => 'B'
        }
    ]
  end

  subject { DataRepository }

  before do
    allow(Cache).to receive(:data).and_return(data)
  end

  describe '#search_by_term' do
    before do
      @results = subject.search_by_term(term)
    end

    context 'search in location field' do
      let(:term) { 'C' }

      it 'returns matched sites' do
        expect(@results.size).to be(1)
        expect(@results[0]['siteid']).to eq('5001')
      end
    end

    context 'search in sitename field' do
      let(:term) { 'B' }

      it 'returns matched sites' do
        expect(@results.size).to be(1)
        expect(@results[0]['siteid']).to eq('5002')
      end
    end
  end

  describe '#search_by_location' do
    let(:distance) { 100 }

    before do
      allow(HTTParty).to receive(:get).and_return(double(body: '{"result":[{"x":"108","y":"34"}]}'))
      @results = subject.search_by_location(34, 108, distance)
    end

    it 'returns nearby sites' do
      expect(@results.size).to be(1)
      expect(@results[0]['siteid']).to eq('5002')
    end

    it 'add distance to site info' do
      expect(@results[0]['distance']).to eq(0)
    end

    context 'ordered sites' do
      let(:distance) { 1000 }

      it 'orders by distance asc' do
        expect(@results.size).to be(2)
        expect(@results[0]['siteid']).to eq('5002')
      end
    end
  end

  describe '#search_by_ids' do
    it 'returns sites match ids' do
      results = subject.search_by_ids %w(5001 5002)

      expect(results.size).to be(2)
      expect(results[0]['siteid']).to eq('5001')
      expect(results[1]['siteid']).to eq('5002')
    end
  end
end