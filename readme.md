# This is a fork that adds the basic LAN capabibility to this project. The server now runs on the LAN IPv4 by default, so if you have a dedicated CUDA machine, you can access the WebUI from a different PC on LAN,
## Changes in this fork
- Server now binds to `0.0.0.0:8000` by default for LAN access (safe—still local network only, no internet exposure).
- Improved README with LAN setup instructions.
  
# Installation Process
  **If you ALREADY have LocalAIVtuber2 Installed**
  Just copy server.py from this repository and replace your server.py in LocalAIVtuber/backend with the new one. Then run start.bat (Close any open instances of the server first!)
  **If you DO NOT already have LocalAIVtuber2 Installed**
  Download as a .zip, unpack, and run start.bat
  
Once you click start.bat and the console displays "Uvicorn running on 0.0.0.0:8000 (Press Ctrl+C to quit)" a firewall notification from Windows will appear asking if you want to allow this through the firewall. Click "Yes," don't worry this is for LAN only (This only exposes the web UI on your local network. Do not port-forward or use tunneling if you want to keep it private.) and you don't have to click "Yes" each time you start it. If this notification does not come up, you may have to manually allow your python.exe through firewall in "Allow an app through Windows Firewall" and try again.
Ensure both PCs see the connected network as a Private network. You should probably have a static LAN IP set up on your router for the PC you will be hosting the software on for your other LAN device.
Now, you should be able to open your browser and successfully resolve these addresses:
  **On the PC running LANLocalAIVtuber2**
    - 
    ```
    http://localhost:8000
    ```
    - if you have a custom hostname/PC name, *
    ```
    http://hostname:8000
    ```
    - the local/LAN IPv4 address for the PC, i.e
    ```
    http://192.168.x.x:8000
    ```
  **On other PCs connected through LAN**
    - **Default** the local/LAN IPv4 address for the PC, i.e
    ```
    192.168.x.x:8000
    ```
    - if you have a custom hostname/PC name, *
    ```
    hostname:8000
    ```

The only difference here is just a small section of server.py that adds this feature for those who want it.
* Setting a hostname and the PC name will help because then the WebUI can resolve to hostname (if configured on your network)

# Future Plans for LocalAIVtuber2-With-LAN:
Adding ROCM/OpenCL/AMD-based CL platform to allow those with AMD cards (Me, mainly) to use those as well. Not sure how I will get them to play nicely and keep CUDA functionality, but I'll do some research and update if it's possible. Feel free to DM me with ideas or make your own Fork! I am open to contributions and PRs, let's do this together! Happy LLM'ing, and happy coding!

Merry Christmas, fam.

This is a fork of [LocalAIVtuber2]. Please respect the original author's rights.
Forked from 0Xiaohei0/LocalAIVtuber2 – all credit to the original author and contributors of the packages and modules used therein. Much love to the open-source community!



# Original README
# Local AI Vtuber 2 (Fully local AI vtuber that can see your screen and talk in real time)

Full demo and setup guide: https://youtu.be/gD1y4by3CPg?si=oinKcReuUd5xzjKT

- All AI models run locally.
- Can chat about what's on your screen.
- Can be interrupted mid-sentence.
- Modern web UI with 2D and 3D character rendering.
- Custom finetuned language model for more interesting conversations.
- Long term memory storage and retrieval.
- Can edit conversations and export as training data.

  
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/f2a88171-f99b-4a78-a0d7-a03cc380c841" /></td>
    <td><img src="https://github.com/user-attachments/assets/26ccf81d-bfe7-444f-944b-116fb7af4fa5" /></td>
  </tr>
</table>

## Install
### Windows
If you are a Windows user, you can download the release package here, unzip and double click start.bat to start webui:
[https://huggingface.co/xiaoheiqaq/LocalAiVtuber2-windows-package/resolve/main/LocalAIVtuber2.zip?download=true](https://huggingface.co/xiaoheiqaq/LocalAiVtuber2-windows-package/blob/main/LocalAIVtuber2v1.1.0.zip)

### Install Manually

#### 1. Install python 3.10
https://www.python.org/downloads/release/python-3100/

#### 2. Install CUDA toolkit 12.4
https://developer.nvidia.com/cuda-12-4-0-download-archive

#### 3. Create environemnt
```
cd backend
python -m venv venv
.\venv\Scripts\activate
```

#### 4. Install dependencies
```
pip install llama-cpp-python==0.2.90 --extra-index-url https://abetlen.github.io/llama-cpp-python/whl/cu124
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
pip install fastapi uvicorn qdrant-client[fastembed] pyautogui  sounddevice silero-vad easyocr==1.7.2 mss numpy==1.23.4 pytchat soxr
pip install -r services\TTS\GPTsovits\requirements.txt
```

### 5. Start program
```
.\venv\Scripts\activate
python server.py
```

After setup, you can also double click the ```start.bat``` file to start the program without needing to open the terminal.



## Setting up from a clone
This is for if you want to clone the repo for contributing to this project

### 1. Clone the repo and follow the envrionemnt setup as described above


### 2. Get the pretrained TTS model from the release package
Copy this folder in the release package 
```backend\services\TTS\GPTsovits\GPT_SoVITS\pretrained_models``` to the same location in the cloned project.


### 3. Get ffmpeg from the release package
Copy ```backend\ffmpeg.exe``` and ```backend\ffprobe.exe``` to same path in cloned project


### 4. Build frontend

Install nodejs https://nodejs.org/en/download

```
cd frontend
npm i
npm run build
```

The project should be ready for development.

## FAQ
### nltk error
<img width="449" height="142" alt="image" src="https://github.com/user-attachments/assets/04a80930-5da0-439f-b6c6-23f4b993a543" />

Open a terminal any where and run
```
pip install nltk
python -m nltk.downloader -d C:\nltk_data all
```
