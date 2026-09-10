#use python
FROM python:3.11-slim

#this dockerfile is in its working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#copy source code into the container
COPY . .

#expose the port being used for this program
#EXPOSE 5001

# Run
CMD ["python", "API.py"]