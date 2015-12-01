#####_Hey there Josh,_

After doing more digging, and giving it some thought, here's what I've come up with:
<br>

---

####Facebook API

* [oauth](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow)
    * for login, between 4-8h 
* [open graph](https://developers.facebook.com/docs/games/opengraph)
    * posting customized messages, between 4-8h
* [explicit sharing](https://developers.facebook.com/docs/sharing/opengraph/using-actions)
    * delay sharing until content is moderated, between 6-8h  

######___Total of 14-24hr___

####Moderator content ADMIN:  
_the entire admin area should only take 18-24h (there shouldn't be any styling or functionality to this component beyond what is existent in [twitter bootstrap](http://getbootstrap.com) though)_

* single user
* access to all pending posts
* POST (send to facebook) or DELETE (reject post)  
_note: it should be noted that I am not accounting for the 'informing user of destroyed post' functionality, that would add roughly 2-4h_

######___Total of 18-24hr___

######___Total-total of 32-48hr___

---

I am thinking that this is a best case scenario for the hours, so feel free to pad them a bit. Like I said last time, I haven't ever worked with the Facebook API before, so I am giving myself extra time to navigate the learning. I have also not taken into account the need to persist any data to the client's server (that we would implement?). I have also not taken into account any time that administering the server/database and set up would take. <span style="color:deeppink;">_Even though I believe that time spent setting up the server/database would be marginal_</span>, I still say, better safe than sorry.