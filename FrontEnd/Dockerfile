# Assuming you're serving plain HTML + JS via NGINX:


# Use an official Nginx image to serve static files
FROM nginx:alpine

# Removing default nginx static files.
RUN rm -rf /usr/share/nginx/html/*

# Setting the working dir to Frontend.
WORKDIR /usr/share/nginx/html

# Copy the custom Nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf


# Copy the entire FrontEnd folder to the Nginx html directory
COPY . .
RUN chmod -R 755 /usr/share/nginx/html
RUN cp Pages/LoginPage.html index.html

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
