## Design Specification

### Problem Statement

Streaming services are many people’s primary method of listening to music. Unfortunately none of these services contain all of the music that a user might want to listen to. Additionally, the ability to share playlists across services is not a feature that exists yet.   

Suppose you use both Spotify and SoundCloud. You want to create a playlist of songs X, Y, and Z. X and Y are on Spotify and Z is on SoundCloud. Currently there is no single place to listen to all of these songs in a single playlist.  

The first article supports creation of a streaming aggregation system by showing that the different kinds of music people have and the way they can access it can greatly change the kind of playlist that they make. The structure of the given method of music aggregation seems to have a direct effect on how people structure their playlists.   

**Research**   
[Research1](http://www.tandfonline.com/doi/abs/10.1080/03007766.2015.1021174)   
[Research2](http://www.tandfonline.com/doi/abs/10.1080/03007760500159088)

### Core Features

* Searching songs on Spotify and SoundCloud
* Create playlists using songs from both streaming services
* Play songs from SoundCloud and Spotify
* Like songs
* Save playlists
* Edit playlists
	* Rename Playlist
	* Rearrange the order of songs
	* Delete songs
* Delete playlists
* Shuffle playlist songs
* Share playlists with other users (maybe on social media too)
* User accounts
	* View saved playlists and liked songs
	* Connect to Spotify Account 


### UI Description

**Landing Page**      
We want our landing page to be really simple and intuitive for users to go to next step, so there’ are only three buttons on the first page. There is a simple “sign in” form and button is for existing users to login into their personal accounts where they can see all of their saved playlists. There is also a “sign up” button for new users. The “enter as guest” button is for users without an account to create an instant playlist. They can always login to save their playlist.   

**Main Playlist Page**  
*Header*   
The search bar on the top is for users to search for tracks via track name, artist, or album. Users can choose which streaming service to get results from, either Spotify or SoundCloud, by clicking on the dropdown button next to the search bar and checking the appropriate checkboxes. Logged in users can get to their profile page by clicking on the top right profile picture or sign out by clicking the “sign out” button. Non-logged in users can sign in or sign up for a new account by clicking the corresponding buttons.  

*Large Media Player View*   
On the left side of the page there is a large album picture of the current track as well as a scrobbler showing current time on the track. When users hover over the album picture a pause/play icon will appear which they can click to pause or continue playing the loaded track. They can also click on the right forward icon to skip to the next song or click on the left backward icon to play the previous song. 

*Playlist*   
The section on the right of the page is the current playlist. The “share” button on the top allows users to share the current playlist with others via url link. Users can click on the title of a song on the playlist to play that song immediately. By clicking on the “3 dot menu” icon next to a song, a drop down menu will appear with additional functions such as deleting the song from the playlist and rearranging its order. Logged in users will be able to save the current playlist using the “save” button on the top. Logged in users can also “like” a song by clicking the heart icon next to it. Users can shuffle the order that the songs will play in playlist by toggling the “shuffle” icon.   

**Search Results (View in Main Playlist Page)**  
This view appears after the user makes a search query. It shows the results of that query. The left side shows the result from SoundCloud, and the right part is from the Spotify. By clicking on the “+” next to each song, users can add the song to the current playlist. The right section of the page is still the current playlist. The bar on the bottom of the page is a small version of the music player which has standard media controls (play/pause, skip, and go back). Users can go back to the large media player view by clicking on the arrow pointing up on the smaller player bar.   

**User Profile Page**   
The left side of the page shows the user’s basic account information (i.e., username and profile picture) and a button for them to connect to their spotify account. The right side of the page has all the user’s saved playlists as well as a playlist of their liked songs. Clicking on a playlist will bring up a new “main playlist page” with the selected playlist loaded. The user can delete or rename a playlist by clicking on the “3 dot menu” icon next to it. They can also create new playlists by clicking on the “create new” button near the top.  
