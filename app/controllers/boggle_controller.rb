require 'HTTParty'
class BoggleController < BaseApiController
  before_action :authorize_request

  def generate
      begin
        boardSize=params[:boardsize]
      game=BoggleGame.new
      response= game.generate(boardSize.to_i)
      # render plain: { hello: 'world' }.to_json, content_type: 'application/json'
      data = {
        :code => 200,
        :data => response,
        :msg=>"ok"
      }
    render json: data
      rescue StandardError => e
        data = {
          :code => 500,
          :data => "",
          :msg=>e.message
        }
      render json: data
      end
  end

  def checkword()
    begin  
      word=params[:word]
      uri = "https://montanaflynn-spellcheck.p.rapidapi.com/check/?text=#{word}"    

      response =HTTParty.get(uri,{
        headers: {"X-RapidAPI-Key"=> "6b4ce8db0emsh5941a7a6e893d5ep1f8c48jsnd7863878d7ef"}
      })
      response=response.body
      data = {
        :code => 200,
        :data => response,
        :msg=>"ok"
      }
      render json: response
      rescue StandardError => e
      data = {
        :code => 500,
        :data => "",
        :msg=>e.message
      }
      render json: data
    end
  end

# def token
#   hmac_secret = 'my$ecretK3y'
#   payload = { data: 'test' }
#  accessToken=JWT.encode payload, hmac_secret, 'HS256'
#     data = {
#   :code => 200,
#   :data => accessToken,
#   :msg=>"ok"
#     }
#   render json:data

# end
end
