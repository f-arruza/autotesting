require 'calabash-android/calabash_steps'

Then /^I select2 "([^\"]*)" from "([^\"]*)"$/ do |item_identifier, spinner_identifier|
  spinner = query("android.widget.Spinner marked:'#{spinner_identifier}'")
  print (spinner)
  if spinner.empty?
    tap_when_element_exists("android.widget.Spinner * marked:'#{spinner_identifier}'")
  else
    touch(spinner)
  end

  tap_when_element_exists("android.widget.PopupWindow$PopupViewContainer * marked:'#{item_identifier}'")
end