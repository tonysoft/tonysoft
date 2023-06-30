## Step 1: Settings | Compile Mode | Wasm
 In your chosen Project, at L1, Edit Settings.
 
<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/SettingsAtL1.png" width="160"></img><br/><br/>

Edit to see Settting at L2.

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/SettingsAtL2.png" width="450"></img><br/><br/>

Edit to change the Compile Mode.

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/SettingsAtL3.png" width="850"></img><br/><br/>

## ### Step 2: At L1, set “Project Info” from “Tools and Settings”  
Upper RIght Corner dropdown in Project at L1, select “Tools and Settings”

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/ToolsAndSettingsAtL1.png" width="260"></img><br/><br/>

Then select “Project Info” and fill in the appropriate data about your project and then “SAVE”

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/ToolsAndSettingsL1Selection.png" width="460"></img><br/><br/>

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/ProjectInfoAndSettings.png" width="460"></img><br/><br/>

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/SaveButton.png" width="460"></img><br/><br/>


## ### Step 3: For any “Flow” (Screen) you wish to be a potential “Start Screen”

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/PotentialStartScreens.png" width="660"></img><br/><br/>

Edit the Screen Module and, at L2 from the Top Right Dropdown choose “Tools and Settings” and, from that Dropdown, select “Screen Info”, fill in appropriately, and “SAVE”

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/ToolsAndSettingsAtL2.png" width="260"></img><br/><br/>

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/ScreenInfoAtL2.png" width="460"></img><br/><br/>

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/ScreenInfoForm.png" width="460"></img><br/><br/>

## Step 4: Set the Desired Screen you wish to be the Home Screen for this App
As seen below, select from the Dropdown on your chosen Screen.

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/SetAsHomeScreen.png" width="560"></img><br/><br/>

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/AlternateHomeScreen.png" width="560"></img><br/><br/>

**IMPORTANT**: Rebuild and Publish after making this change…

## Step 5: At L1, “Tools and Settings”, “Host on GCS” (Google Cloud Storage)
Upper RIght Corner dropdown in Project at L1, select “Tools and Settings” and then, from the Dropdown, select “Host on GCS” to make this Project available in the Cloud.

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/ToolsAndSettingsAtL1.png" width="260"></img><br/><br/>

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/HostOnGCS.png" width="460"></img><br/><br/>

You will be presented with a Form to specify which Project(s) and Databases(s) should be included in the Project Upload.

  

**SPECIAL NOTE** for this SIMPLE exercise. Just select THIS Project in both the “Select projects to package” AND the “List of databases to include” (that’s a multiline text entry for now) form entries.

  

**IMPORTANT NOTE**: Pay special attention to your entry for “Filename” in the “Upload Package” form as this will be important in the next step in the App Clip deployment process.

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/UploadPackageToGCSPart1.png" width="460"></img><br/><br/>

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/UploadPackageToGCSPart2.png" width="460"></img><br/><br/>

## Step 6: Register the App Clip
Navigate to: [https://remix-beta.remixlabs.com/remix_app/home](https://remix-beta.remixlabs.com/remix_app/home) and enter some unique name, as seen below, and Click on “NEW APPCLIP”. You will then see the form to define your App Clip Registration Record.

<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/RegisterNewAppClip.png" width="600"></img><br/><br/>

As we ONLY care about an App Clip in this exercise, select the Project you have been working on for both “Appclip - Project” and “Application - Project”.  
  
Leave “Params” as is for now and IGNORE the “Patch” settings.  
  
Specify an image and upload it as instructed.  
  
Enter “Title”, “Subtitle”, and “Description” as appropriate.  
  
Leave the “HTML Body Override” empty for now or just use some valid HTML to see that you can change the “Splash Screen” which precedes the display of your App Clip.

  
After you SAVE, you can navigate to: [https://remix.app/sample_app_clip](https://remix.app/sample_app_clip) or whatever your entered like “some_name” which would be: [https://remix.app/some_name](https://remix.app/some_name)


<img src="https://storage.googleapis.com/rmx-static/techdoc/appclips/AppClipRegistrationForm.png" width="600"></img><br/><br/>
