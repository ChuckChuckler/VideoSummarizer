from flask import Flask, render_template, json, jsonify, request
from youtube_transcript_api import YouTubeTranscriptApi as ytApi

app = Flask(__name__, template_folder="templates", static_folder="static")

@app.route("/")
def index():
  return render_template("main.html")

@app.route("/submitted", methods=["POST"])
def yippee():
  if not request.json:
    print("No JSON found.")
    return jsonify({"message": "eheu"})
  elif "data" not in request.json:
    print("JSON found, but no data.")
    return jsonify({"message": "eheu"})
  else:
    ytUrl = request.json["data"]
    idIndex = ytUrl.index("v=")
    videoID = ytUrl[idIndex+2:]
    transcript = ytApi.get_transcript(videoID)
    transcriptTextOnly = ""
    for i in transcript:
      transcriptTextOnly += i["text"] + " "
    print(transcriptTextOnly)
    return jsonify({"message": transcriptTextOnly})


app.run(host="0.0.0.0", port=8080, debug=True)
