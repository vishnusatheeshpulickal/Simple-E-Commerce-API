 exports.welcomeMailTemplate = (name) =>{
    return(`<!DOCTYPE html>
    <html lang="en-US">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>welcome</title>
        </head>
        <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="padding: 0;">
            <div id="wrapper" dir="ltr" style="background-color: #f7f7f7; margin: 0; padding: 70px 0; width: 100%; 
            -webkit-text-size-adjust: none;">
                <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                    <tr>
                        <td align="center" valign="top">
                            <div id="template_header_image">
                                                        </div>
                            <table border="0" cellpadding="0" cellspacing="0" width="600"
                             id="template_container" style="background-color: #ffffff; border: 1px solid 
                             #dedede; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); border-radius: 3px;">
                                <tr>
                                    <td align="center" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_header" 
                                        style='background-color: #96588a; color: #ffffff; border-bottom: 0; font-weight: bold; 
                                        line-height: 100%; vertical-align: middle; font-family: "Helvetica Neue", Helvetica, Roboto, 
                                        Arial, sans-serif; border-radius: 3px 3px 0 0;'>
                                            <tr>
                                                <td id="header_wrapper" style="padding: 36px 48px; display: block;">
                                                    <h1 style='font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; 
                                                    font-size: 30px; font-weight: 300; line-height: 150%; margin: 0; text-align: left; 
                                                    text-shadow: 0 1px 0 #ab79a1; color: #ffffff;
                                                     background-color: inherit;'>Welcome to VSP Stores</h1>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body">
                                            <tr>
                                                <td valign="top" id="body_content" style="background-color: #ffffff;">
                                                    <!-- Content -->
                                                    <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td valign="top" style="padding: 48px 48px 32px;">
                                                                <div id="body_content_inner" style='color: #636363; 
                                                                font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
                                                                 font-size: 14px; line-height: 150%; text-align: left;'>
    
    <p style="margin: 0 0 16px;">Hi ${name},</p>
    <p style="margin: 0 0 16px;">
    We’re super excited to see you join the VSP Stores community.
    <br/><p style="margin: 0 0 16px;">
    We hope you will be happy with products offered by the VSP Stores and that you will shop with us again and again.
     <br/></p>
    Our goal is to offer the widest range of products offered by the VSP Stores at the highest quality.
     If you think we should add any items to our store, don’t hesitate to contact us and share your feedback.
    <p style="margin: 0 0 16px;"><br/>
    Until then, enjoy your shopping!
     </p>
    Best,<br/>
    Vishnu Satheesh </p>
    
    <p style="margin: 0 0 16px;">We look forward to seeing you soon.</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top">
                            <!-- Footer -->
                            <table border="0" cellpadding="10" cellspacing="0" width="600" id="template_footer">
                                <tr>
                                    <td valign="top" style="padding: 0; border-radius: 6px;">
                                        <table border="0" cellpadding="10" cellspacing="0" width="100%">
                                            <tr>
                                                <td colspan="2" valign="middle" id="credit" style='border-radius: 6px; border: 0; color: #8a8a8a; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 12px; line-height: 150%; text-align: center; padding: 24px 0;'>
                                                    <p style="margin: 0 0 16px;">&copy; VSP Stores</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
    </html>
    `)
}