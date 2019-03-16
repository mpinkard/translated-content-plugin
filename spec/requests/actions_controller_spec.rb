require 'rails_helper'

describe TranslatedContent::ActionsController do
  before do
    SiteSetting.queue_jobs = false
  end

  it 'can list' do
    sign_in(Fabricate(:user))
    get "/translated-content/list.json"
    expect(response.status).to eq(200)
  end
end
