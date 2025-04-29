# Use an official Nginx image to serve static files
FROM nginx:stable-alpine

# Copy the entire FrontEnd folder to the Nginx html directory
COPY ./ /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html
# Copy the custom Nginx configuration file
COPY FrontEnd/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
