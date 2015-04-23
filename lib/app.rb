require 'sinatra'
require './lib/data_repository'

get '/address' do
  DataRepository.search_by_term(params[:term]).to_json
end

get '/' do
  @results = params[:term].nil? ? [] : DataRepository.search_by_term(params[:term])
  erb :index
end