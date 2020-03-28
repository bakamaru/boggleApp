require 'jwt'
class TokenController < ApplicationController
  skip_before_action :verify_authenticity_token
  def issue

    clientId=params[:clientid]
    secretKey=params[:secretkey]    
    if clientId=="testclientid" and secretKey=="mysecretkey"     
      hmac_secret = secretKey
      exp = (30).minutes.from_now.to_i 
      payload = { 
        iss: 'binodtamang',            
        client_id:clientId,
        exp: exp
      }
      accessToken=JWT.encode payload, hmac_secret, 'HS256'
      data = {
            :code => 200,
            :data => accessToken,
            :msg=>"ok"
            }
      render json:data
        
    else      
      data = {
        :code => 401,
        :data => nil,
        :msg=>"unauthorized request"
        }
      render json:data
    end

    
  end
end
