require 'test_helper'
class TokenControllerTest < ActionDispatch::IntegrationTest
 
    test "should get token with valid credential" do
      post "/token/get",params:{clientid:"testclientid",secretkey:"mysecretkey"}
     puts response.body
     tokenresponse = JSON.parse(@response.body)
    assert_equal 200, tokenresponse['code']
    end 
  
    test "should not get token with invalid credential" do
      post "/token/get",params:{clientid:"testclientid1234",secretkey:"mysecretkey"}
     puts response.body
     tokenresponse = JSON.parse(@response.body)
    assert_equal 401, tokenresponse['code']
    end 
  
  end
  