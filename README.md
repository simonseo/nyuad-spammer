# nyuad-spammer

![](https://github.com/simonseo/nyuad-spammer/blob/master/images/logo_v1.png)
<!-- /Users/student/Desktop/nyuad-spammer/images/logo_v1.png -->

## Problem Identification
NYU Abu Dhabi students are constantly missing deadlines, events, and information. But why?  
In today's world, there is an increasing amount of platforms and notifications students must keep track of. These information come via many
channels including the student portal. As there exists almost no reason to go on the student portal besides checking the announcement,
many students do not check the student portal often enough, and miss information that could be of potential use.

## Purpose and Goals
The purpose of this project is to help the NYUAD student community be informed of deadlines, events, operating campus time changes, and other university-related information.

Our goal is to create a Facebook Messenger Chatbot that will allow students to get message notifications. This will be done through the scraping of Student Portal using python and BeautifulSoup. We decided the facebook chatbot, as facebook messenger is an application that
most students check multiple times throughout the day. We believe that if we can merge the flow of useful information to a channel which is already used often, it would be easier for the information to be properly delivered.

## User Stories and Use Cases
- As a user, I want to be able to check the nyuad-spammer chatbot
  - The user should be able to access the chatbot on his/her messenger account.
- As a user, I want to be able to type in keywords to get information on Student Portal or NYUAD Facebook Groups.
  - The user should be able to see the list of keywords he/she can type in to access categories in Student Portal or NYUAD Facebook Groups.
  - The user should be able to recieve information on deadlines and events after typing the keyword.
- As a user, I want to be able to recieve notifications at a certain hour and day.
  - The user should be able to tell the chatbot to remind him/her about an deadline or event at a certain chosen time.
- As a user, I want to be able to snooze notifications.
  - The user should be able to ask the chatbot to hide the notification.
