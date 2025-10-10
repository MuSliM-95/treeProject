import Script from 'next/script'

export function GoogleAnalytics() {
	return (
		<>
			{/* Этот скрипт автоматически добавится в <head> */}
			<Script
				strategy='beforeInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
			/>
			<Script id='gtag-init' strategy='beforeInteractive'>
				{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });

            gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');
          `}
			</Script>
		</>
	)
}
