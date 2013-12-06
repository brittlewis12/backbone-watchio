Watchio::Application.routes.draw do
  root 'app#index'
  resources :movies do
    get :search, on: :collection
  end
end
