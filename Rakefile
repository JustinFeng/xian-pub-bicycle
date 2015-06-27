APP_FILE  = 'lib/app.rb'
APP_CLASS = 'App'
require 'sinatra/assetpack/rake'
require 'rspec/core/rake_task'

task default: :specs

desc 'Run all specs'
RSpec::Core::RakeTask.new(:specs) do |spec|
  spec.pattern = 'spec/**/*_spec.rb'
  spec.rspec_opts = ['--color --format d']
end

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

require './lib/cache'
namespace :data do
  desc 'Cache bicycle station data'
  task :cache do
    Cache.cache
  end
end