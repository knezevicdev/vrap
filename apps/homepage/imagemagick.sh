#!/bin/bash

# Create the folder to store Next Gen images
mkdir ./public/modules/home/images/jp2
mkdir ./public/modules/home/images/webp

# Go into Image directory for easier understanding
cd public/modules/home/images

# Loop through all images in the Image directory
for file in *; do
  # This means, do not run this code on a directory, only on a file (-f)
  if [[ -f $file ]]; then

    fileName=$(echo $file | cut -d'.' -f 1) # something.jpg -> something
    echo $fileName

    # Conversion to Next Gen formats, using solely imageMagick defaults
    # 100 is used as the default generally lessens the quality of the image
    convert $file -quality 100 ./webp/$fileName.webp
    convert $file ./jp2/$fileName.jp2

  fi

done

# Go back down
cd ../../../..