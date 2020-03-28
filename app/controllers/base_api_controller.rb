class BaseApiController < ActionController::Base

    def not_found
        render json: { error: 'not_found' }
      end
    
      def authorize_request
        #puts 'hhe'
        header = request.headers['Authorization']
       # puts header
        header = header.split(' ').last if header
        begin
          @decoded = JsonWebToken.decode(header)
          @issuer =@decoded[:iss]
         # puts  @issuer
         
          @expiry =@decoded[:exp]
         # puts @expiry
          if @issuer=="binodtamang" and Time.current.to_i>@expiry
            data = {
              :code => 456,
              :data => nil,
              :msg=>"unauthorized request"
              }
              render json:data
          end        
        rescue JWT::DecodeError => e
          data = {
            :code => 401,
            :data => nil,
            :msg=>e.message 
            }
            render json:data
        end
      end
end

class JsonWebToken
    SECRET_KEY = "mysecretkey"
  
    def self.encode(payload, exp = 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, SECRET_KEY)
    end
  
    def self.decode(token)
      decoded = JWT.decode(token, SECRET_KEY)[0]
      HashWithIndifferentAccess.new decoded
    end
  end
