require 'sinatra/base'
require 'sinatra/assetpack'
require './lib/data_repository'

class App < Sinatra::Base
  set :root, File.join(File.dirname(__FILE__), '..')
  set :views, File.join(File.dirname(__FILE__), '..', 'views')

  register Sinatra::AssetPack

  assets {
    serve '/js',     from: 'assets/js'
    serve '/css',    from: 'assets/css'
    serve '/img', from: 'assets/img'
    serve '/font', from: 'assets/font'

    js :application, '/js/application.js', [
               '/js/vendor/*.js',
               '/js/lib/**/*.js'
           ]

    css :application, '/css/application.css', [
                '/css/*.css'
            ]

    js_compression  :jsmin    # :jsmin | :yui | :closure | :uglify
    css_compression :sass   # :simple | :sass | :yui | :sqwish
  }

  get '/api' do
    begin
      headers 'Access-Control-Allow-Origin' => "*"
      query = JSON.parse(params[:query])
    rescue
      halt 400, "Bad query params: #{params[:query]}"
    end

    if query["ids"]
      DataRepository.search_by_ids(query["ids"]).to_json
    elsif query["lat"] && query["lng"]
      DataRepository.search_by_location(query["lat"], query["lng"], query["distance"] || 1000).to_json
    elsif query["term"]
      DataRepository.search_by_term(query["term"]).to_json
    else
      [].to_json
    end
  end

  get '/' do
    erb :index
  end

end

