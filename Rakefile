APP_FILE  = 'lib/app.rb'
APP_CLASS = 'App'
require 'sinatra/assetpack/rake'

namespace :assets do
  desc 'Clean assets'
  task :clean do
    sh 'rm -rf public'
  end

  desc 'Build assets (clean assets and invoke assetpack:build)'
  task :build => :clean do
    Rake::Task['assetpack:build'].invoke
  end

  desc 'Keep watching and transform jsx to plain js'
  task :jsx_watch do
    exec 'jsx -w -x jsx --no-cache-dir assets/js/jsx/ assets/js/lib/'
  end

  desc 'Transform jsx to plain js'
  task :jsx do
    exec 'jsx -x jsx --no-cache-dir assets/js/jsx/ assets/js/lib/'
  end
end

require './lib/data_repository'
namespace :data do
  desc 'Cache bicycle station data'
  task :cache do
    DataRepository.cache
  end
end