# name: TranslatedContent
# about: For SF Hep-B Free Discourse instance
# version: 0.1.5
# authors: mpinkard
# url: https://github.com/mpinkard


register_asset "stylesheets/common/translated-content.scss"

enabled_site_setting :translated_content_enabled

PLUGIN_NAME ||= "TranslatedContent".freeze

after_initialize do

  require_dependency "application_controller"
  ApplicationController.class_eval do
    def set_locale
      locale_cookie = cookies[:custom_translation_locale]
      if defined?(locale_cookie) and I18n.locale_available?(locale)
        I18n.locale = locale_cookie
      else 
        I18n.locale = :en
      end
      I18n.ensure_all_loaded!
    end
  end
  
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
