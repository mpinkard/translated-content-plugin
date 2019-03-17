# name: TranslatedContent
# about:
# version: 0.1.1
# authors: mpinkard
# url: https://github.com/mpinkard


register_asset "stylesheets/common/translated-content.scss"


enabled_site_setting :translated_content_enabled

PLUGIN_NAME ||= "TranslatedContent".freeze

after_initialize do
  
  # see lib/plugin/instance.rb for the methods available in this context
  

  module ::TranslatedContent
    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace TranslatedContent
    end
  end

  
  

  require_dependency "application_controller"
  class TranslatedContent::ActionsController < ::ApplicationController
    requires_plugin PLUGIN_NAME

    before_action :ensure_logged_in

    def list
      render json: success_json
    end
  end

  TranslatedContent::Engine.routes.draw do
    get "/list" => "actions#list"
  end

  Discourse::Application.routes.append do
    mount ::TranslatedContent::Engine, at: "/translated-content"
  end
  
end
