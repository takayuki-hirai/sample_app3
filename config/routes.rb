Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'root#index'
  namespace :api do
    resources :comments, only: %i[index create]
  end

end
