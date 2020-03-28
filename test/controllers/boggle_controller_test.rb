require 'test_helper'
class BoggleControllerTest < ActionDispatch::IntegrationTest
    
    setup do
      
    end
   
    test "should get unauthorized request without token" do
        get "/boggle/generate",params:{boardsize:4}    
        apiresponse = JSON.parse(@response.body)
        assert_equal 401, apiresponse['code']
    end 
  
    test "should get response  with token" do

        post "/token/get",params:{clientid:"testclientid",secretkey:"mysecretkey"}
        tokenresponse = JSON.parse(@response.body)

        get "/boggle/generate",headers:{'Authorization': 'Bearer '+ tokenresponse['data']} ,params:{boardsize:4}    
        apiresponse = JSON.parse(@response.body)
        puts apiresponse
        assert_equal 200, apiresponse['code']
    end 
  
  end
  