from PIL import Image
import os

source_path = '/Users/serhataykis/.gemini/antigravity/brain/b3d3dd05-721d-4af1-899f-2bfe533b221b/triplist_flat_red_suitcase_icon_1765902119364.png'
dest_dir = '/Users/serhataykis/.gemini/antigravity/scratch/travel-checklist/'

try:
    img = Image.open(source_path)
    
    # Save 512x512
    img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
    img_512.save(os.path.join(dest_dir, 'icon-512.png'))
    print('Saved icon-512.png')
    
    # Save 192x192
    img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    img_192.save(os.path.join(dest_dir, 'icon-192.png'))
    print('Saved icon-192.png')

except Exception as e:
    print(f"Error: {e}")
