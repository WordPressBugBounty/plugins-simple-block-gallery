import { __ } from '@wordpress/i18n';
import { RangeControl, Button, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	const onUpdateImage = ( image ) => {
		setAttributes( {
			image: image,
			images_ids: List_Ids( image ),
			list_images: List_Images( image )
		} );
	};

	function List_Ids( image ) {
		let j = [];
		for( let i in image ) {
			j.push( image[i].id );
		}
		return j;
	}

	function List_Images( image ) {
		let unique_id = getCurrentDateTimeID();
		let j = '<!-- wp:paragraph -->';
		j += '<style type="text/css">';
		j += '.simple-block-gallery-masonry' + unique_id + ' { columns: auto ' + attributes.width + 'px; column-gap: 0; margin: 0 auto; padding: 0; }';
		j += '</style>';
		j += '<div class="simple-block-gallery-masonry' + unique_id + '">';
		for( let i in image ) {
			j += '<style type="text/css">';
			j += 'div#masonry' + unique_id + ' { display: block; padding-right: ' + attributes.padding + 'px; padding-bottom: ' + attributes.padding + 'px; margin: 0; line-height: 0; }';
			j += 'div#masonry' + unique_id + ' img { max-width: 100%; height: auto; display: block; border-radius: ' + attributes.r_images + 'px; }';
			j += '</style>';
			j += '<div id="masonry' + unique_id + '">';
			j += '<!-- wp:image {"lightbox":{"enabled":' + attributes.link + '},"id":' + image[i].id + ',"sizeSlug":"large","linkDestination":"none"} --><figure class="wp-block-image size-large">';
			j += '<img src="' + image[i].url + '" alt="' + image[i].alt + '">';
			j += '</figure><!-- /wp:image --></div>';
		}
		j += '</div>';
		j += '<!-- /wp:paragraph -->';
		return j;
	}

	function getCurrentDateTimeID() {

		const now = new Date();
		const year = now.getFullYear();
		const month = String( now.getMonth() + 1 ).padStart( 2, '0' );
		const day = String( now.getDate() ).padStart( 2, '0' );
		const hours = String( now.getHours() ).padStart( 2, '0' );
		const minutes = String( now.getMinutes() ).padStart( 2, '0' );
		const seconds = String( now.getSeconds() ).padStart( 2, '0' );

		return `${year}${month}${day}_${hours}${minutes}${seconds}`;
	}

	attributes.list_images = List_Images( attributes.image );

	const { preview } = attributes;
	if ( preview ) {
		return (
			<div className="simple-block-gallery-block-preview">
				<img src = { simple_block_gallery_preview_masonry.url } alt="Preview" />
			</div>
		);
	}

	const media_upload = [];
	media_upload.push(
		<MediaUploadCheck>
			<MediaUpload
				title = { __( 'Masonry Block', 'simple-block-gallery' ) }
				onSelect = { onUpdateImage }
				allowedTypes = 'image'
				gallery = { true }
				multiple = { true }
				value = { attributes.images_ids }
				render = { ( { open } ) => (
					<Button
						variant = "secondary"
						onClick = { open }>
						{ ! attributes.images_ids ? __( 'Create Gallery', 'simple-block-gallery' ) : __( 'Update gallery', 'simple-block-gallery' ) }
					</Button>
				) }
			/>
		</MediaUploadCheck>
	);

	return (
		<div { ...blockProps }>
			<RawHTML>{ attributes.list_images }</RawHTML>
			{ media_upload }
			<InspectorControls>
				<PanelBody title = { __( 'Settings', 'simple-block-gallery' ) } initialOpen = { true }>
					{ media_upload }
					<hr />
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label = { __( 'Width', 'simple-block-gallery' ) }
						max = { 1000 }
						min = { 10 }
						value = { attributes.width }
						onChange = { ( value ) => setAttributes( { width: value } ) }
					/>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label = { __( 'Space', 'simple-block-gallery' ) }
						max = { 20 }
						min = { 0 }
						value = { attributes.padding }
						onChange = { ( value ) => setAttributes( { padding: value } ) }
					/>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label = { __( 'Rounded Images', 'simple-block-gallery' ) }
						max = { 20 }
						min = { 0 }
						value = { attributes.r_images }
						onChange = { ( value ) => setAttributes( { r_images: value } ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label = { __( 'Expand on click', 'simple-block-gallery' ) }
						help = { __( 'Scales the image with a lightbox effect', 'simple-block-gallery' ) }
						checked = { attributes.link }
						onChange = { ( value ) => setAttributes( { link: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
