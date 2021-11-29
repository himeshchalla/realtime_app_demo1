FROM rethinkdb:2.4

RUN apt-get update; exit 0
RUN apt install -y python3 python3-pip
RUN pip3 install rethinkdb


COPY ./seed/* /home/app/seed/
# rethinkdb/init/realtimeapp.channel.json

# RUN rethinkdb; 
# RUN exit 0

# RUN rethinkdb restore ./seed/realtimeapp.channel.json
# RUN rethinkdb restore ./seed/realtimeapp.message.json
# RUN rethinkdb restore ./seed/realtimeapp.user.json

# RUN rethinkdb import -f /home/rethinkdb/seed/realtimeapp.channel.json --table realtimeapp.channel --format json
# RUN rethinkdb import -f /home/app/seed/realtimeapp.channel.json --table realtimeapp.channel --format json
# RUN rethinkdb restore /home/app/seed/realtimeapp.channel.json -i realtimeapp.channel

