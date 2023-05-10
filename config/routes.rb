Rails.application.routes.draw do
  get "tasks" => "tasks#index"
  post "tasks" => "tasks#create"
end
