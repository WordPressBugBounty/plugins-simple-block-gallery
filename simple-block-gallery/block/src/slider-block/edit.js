import { __ } from '@wordpress/i18n';
import { RangeControl, Button, PanelBody } from '@wordpress/components';
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
		let j = '<!-- wp:paragraph -->';
		if ( image ) {
			let unique_id = getCurrentDateTimeID();
			let slide_interval = '';
			let base = Math.floor( 100 / image.length );
			let base2 = base / 100;
			let flame_1 = '';
			let flame_2 = '';
			for( let k = 0; k < image.length; k++ ) {
				if ( 0 == k ) {
					flame_1 = '0%';
					flame_2 = base + '%';
					slide_interval += flame_1 + '{ left: 0%; } ';
					slide_interval += flame_2 + '{ left: 0%; } ';
				} else {
					flame_1 = base * k + base2 + '%';
					flame_2 = base * k + base + '%';
					slide_interval += flame_1 + '{ left: -' + ( k * 100 ) + '%; } ';
					slide_interval += flame_2 + '{ left: -' + ( k * 100 ) + '%; } ';
				}
			}
			slide_interval += ' 100% { left: 0%; }';
			j += '<style type="text/css">';
			j += '@keyframes slidy' + unique_id + ' { ' + slide_interval + '}';
			j += 'div#slider' + unique_id + ' { overflow: hidden; margin: 0 auto; padding: 0; }';
			j += 'div#slider' + unique_id + ' figure img { width: ' + 100 / image.length + '%; hight: auto; float: left; }';
			j += 'div#slider' + unique_id + ' figure { position: relative; width: ' + 100 * image.length + '%; margin: 0; left: 0; text-align: left; font-size: 0; animation: ' + ( attributes.animation * image.length ) + 's slidy' + unique_id + ' infinite; }';
			j += '</style>';
			j += '<div id="slider' + unique_id + '">';
			j += '<figure>';
			for( let i in image ) {
				j += '<img src="' + image[i].url + '" alt="' + image[i].alt + '">';
			}
			j += '</figure></div>';
		}
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
				<img src = { simple_block_gallery_preview_slider.url } alt="Preview" />
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			<RawHTML>{ attributes.list_images }</RawHTML>
			<MediaUploadCheck>
				<MediaUpload
					title = { __( 'Slider block', 'simple-block-gallery' ) }
					onSelect = { onUpdateImage }
					allowedTypes = 'image'
					gallery = { true }
					multiple = { true }
					value = { attributes.images_ids }
					render = { ( { open } ) => (
						<Button
							variant = "secondary"
							onClick={ open }>
							{ ! attributes.images_ids ? __( 'Create Gallery', 'simple-block-gallery' ) : __( 'Update gallery', 'simple-block-gallery' ) }
						</Button>
					) }
				/>
			</MediaUploadCheck>

			<InspectorControls>
				<PanelBody title = { __( 'Settings', 'simple-block-gallery' ) } initialOpen = { true }>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label = { __( 'Interval', 'simple-block-gallery' ) }
						max = { 30 }
						min = { 1 }
						value = { attributes.animation }
						onChange = { ( value ) => setAttributes( { animation: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
