from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

def create_icon(size):
    # Create main image with transparency
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Background: Rounded Rectangle with Gradient
    bg_color_start = (102, 126, 234) # #667eea
    bg_color_end = (118, 75, 162)    # #764ba2
    
    # Simulate gradient by drawing lines
    for y in range(size):
        r = int(bg_color_start[0] + (bg_color_end[0] - bg_color_start[0]) * (y / size))
        g = int(bg_color_start[1] + (bg_color_end[1] - bg_color_start[1]) * (y / size))
        b = int(bg_color_start[2] + (bg_color_end[2] - bg_color_start[2]) * (y / size))
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))
        
    # Create a mask for rounded corners
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = size // 5
    mask_draw.rounded_rectangle([(0, 0), (size, size)], radius=corner_radius, fill=255)
    
    # Apply mask to background
    img.putalpha(mask)
    
    # Draw "Checklist/Luggage" Icon Content
    # White rounded rect in center
    rect_margin = size // 4
    rect_width = size - (rect_margin * 2)
    rect_height = int(rect_width * 1.2)
    rect_x = (size - rect_width) // 2
    rect_y = (size - rect_height) // 2 + (size // 20)
    
    # Draw white paper/clipboard shape
    draw.rounded_rectangle(
        [(rect_x, rect_y), (rect_x + rect_width, rect_y + rect_height)],
        radius=size//15,
        fill=(255, 255, 255, 230)
    )
    
    # Draw Checkmarks (Green circles)
    check_x = rect_x + (rect_width // 4)
    item_height = rect_height // 5
    
    for i in range(3):
        cy = rect_y + (i * item_height) + (item_height * 1.5)
        r = item_height // 4
        # Draw green circle
        draw.ellipse(
            [(check_x - r, cy - r), (check_x + r, cy + r)],
            fill=(16, 185, 129, 255) # Green
        )
        # Draw white checkmark lines
        draw.line(
            [(check_x - r//2, cy), (check_x, cy + r//2), (check_x + r//1.5, cy - r//1.5)],
            fill=(255, 255, 255, 255),
            width=max(2, size//60)
        )
        
        # Draw lines (text representation)
        line_x_start = check_x + (r * 2.5)
        line_x_end = rect_x + rect_width - (rect_width // 6)
        draw.line(
            [(line_x_start, cy), (line_x_end, cy)],
            fill=(107, 114, 128, 150), # Gray
            width=max(3, size//40)
        )

    return img

# Generate icons
icon_192 = create_icon(192)
icon_192.save('icon-192.png')

icon_512 = create_icon(512)
icon_512.save('icon-512.png')

print("Icons generated successfully!")
