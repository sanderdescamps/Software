function setup()
  Hardware:servo_init()
  Hardware:servo_enable()
  
  Expression:set_emotion_r_phi(0.0, 0.00)
  Expression:update()
end

function loop()
  if Hardware:ana_read_channel(1) > 1000 then
    Expression:set_emotion_r_phi(1.0, 20, true)
    Expression:update()
    sleep(0.5)
  end
   if Hardware:ana_read_channel(0) > 1000 then
    Expression:set_emotion_r_phi(1.0, 200, true)
    Expression:update()
    sleep(0.5)
  end
end

function quit()
  Hardware:servo_disable()
end
