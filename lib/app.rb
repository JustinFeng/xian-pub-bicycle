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
    serve '/images', from: 'assets/img'

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

  get '/address' do
    DataRepository.search_by_term(params[:term]).to_json
  end

  get '/' do
    @results = params[:term].nil? ? [] : DataRepository.search_by_term(params[:term])
    erb :index
  end

end

