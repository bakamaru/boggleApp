Rails.application.routes.draw do
  root 'home#index'
  match '/token/get',    to: 'token#issue', via: :post
  get ':controller(/:action(/:id))'
 
  
# namespace :api do
#     match ":controller(/:action(/*params))", via: [:get, :post]
# end
  get '*path', to: 'home#index' #redirect to react rout
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
