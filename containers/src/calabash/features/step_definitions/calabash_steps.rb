require 'calabash-android/calabash_steps'

Then /^I enter text "([^\"]*)" into CheckList$/ do |text|
  press_button('KEYCODE_ENTER')
  keyboard_enter_text(text, {})
end
