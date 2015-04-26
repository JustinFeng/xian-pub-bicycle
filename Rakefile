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
end