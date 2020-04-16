/*
NOTE:
This is an area where using the View / ViewModel split doesn't make much sense.
There is a lot of mismatched text styling happening here. Best to just use
straight text inside the tsx inorder to keep this as simple to update for the
future.
*/
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, styled } from '@material-ui/core/styles';
import React, { Children } from 'react';

import PoweredByFooter from 'src/components/footer/PoweredByFooter';
import PoweredByHeader from 'src/components/header/PoweredByHeader';
import Typography from 'src/ui/Typography';

interface Children {
  children: React.ReactNode;
  mb?: number;
}

const BoxH2: React.FC<Children> = ({ children, mb = 2 }) => (
  <Box mb={mb}>
    <Typography variant="h2" fontWeight="fontWeightMedium">
      {children}
    </Typography>
  </Box>
);

const BoxBody: React.FC<Children> = ({ children, mb = 2 }) => (
  <Box mb={mb}>
    <Typography variant="body1" fontWeight="fontWeightLight">
      {children}
    </Typography>
  </Box>
);

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
  })
);

const UnorderedList: React.FC<Children> = ({ children, mb }) => {
  const classes = useStyles();
  return (
    <Box mb={mb}>
      <Typography variant="body1" fontWeight="fontWeightLight" component="span">
        <ul className={classes.root}>{children}</ul>
      </Typography>
    </Box>
  );
};

const ListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <PoweredByHeader />
      <Box px={10} my={4}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h2" fontWeight="fontWeightMedium">
              Security And Privacy
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper square elevation={0} variant="outlined">
              <Box p={4}>
                <BoxH2>How We Protect Your Privacy and Security</BoxH2>
                <BoxBody mb={4}>
                  At Rocket Auto, we want you to be comfortable and confident
                  when using our services. Therefore, we would like to share
                  with you the following principles that govern our information
                  practices and other privacy aspects.
                </BoxBody>
                <BoxH2>
                  We Provide You Notice Of Our Information Practices
                </BoxH2>
                <BoxBody>
                  To maximize the value of our services, we may request
                  information from you when you use our services or interact
                  with our website. Rocket Auto does not share your personal
                  information with outside companies for their promotional use.
                </BoxBody>
                <BoxBody>
                  Here is a description of the information we collect and how it
                  is used:
                </BoxBody>
                <BoxBody mb={1}>
                  <em>Information that we may gather about you:</em>
                </BoxBody>
                <UnorderedList>
                  <ListItem>Identifiers</ListItem>
                  <ListItem>
                    Any personal data described in subdivision (e) of Section
                    1798.80 of the California Consumer Privacy Act
                  </ListItem>
                  <ListItem>
                    Characteristics of protected classifications under
                    California or federal law
                  </ListItem>
                  <ListItem>Commercial data</ListItem>
                  <ListItem>Biometric data</ListItem>
                  <ListItem>
                    Internet or other electronic network activity data
                  </ListItem>
                  <ListItem>Geolocation data</ListItem>
                  <ListItem>Sensory data</ListItem>
                  <ListItem>Professional or employment data</ListItem>
                  <ListItem>Education data</ListItem>
                  <ListItem>
                    Inferences drawn from any of the data used to create a
                    customer profile
                  </ListItem>
                </UnorderedList>
                <BoxBody mb={1}>
                  We might share your data with third parties for business
                  purposes or for any of these reasons:
                </BoxBody>
                <UnorderedList>
                  <ListItem>Auditing</ListItem>
                  <ListItem>Detecting fraud</ListItem>
                  <ListItem>Debugging</ListItem>
                  <ListItem>Providing services</ListItem>
                  <ListItem>Internal research</ListItem>
                  <ListItem>Quality control</ListItem>
                </UnorderedList>
                <BoxBody mb={1}>
                  With your consent, we might share your personal data with
                  third parties, including our affiliates and service providers,
                  for these reasons:
                </BoxBody>
                <UnorderedList>
                  <ListItem>Business purposes</ListItem>
                  <ListItem>Marketing</ListItem>
                  <ListItem>Analytics</ListItem>
                  <ListItem>
                    Pre-populating your information to make your experience
                    easier
                  </ListItem>
                </UnorderedList>
                <BoxBody mb={4}>
                  To opt out of sharing your data, please{' '}
                  <a href="mailto:Help@RocketAuto.com">contact us</a>.
                </BoxBody>
                <BoxH2>More On Our General Information Practices</BoxH2>
                <UnorderedList mb={4}>
                  <ListItem>
                    <strong>Contests, Sweepstakes, And Surveys:</strong> From
                    time to time, we may offer you the option to participate in
                    contests, sweepstakes, or surveys. If you would like to
                    participate, we may ask you for contact information,
                    preferences or other information. This information may be
                    used to conduct research, improve our offerings, or contact
                    you regarding home financing or award prizes. Our contests
                    or sweepstakes may have separate rules and we will identify
                    how the information that you supply will be used in each
                    case.
                  </ListItem>
                  <ListItem>
                    <strong>Mandatory And Optional Information:</strong> We
                    identify what information is required to fulfill your
                    request. If you chose not to provide mandatory information,
                    we will not be able to provide you the service you are
                    requesting.
                  </ListItem>
                  <ListItem>
                    <strong>Service Providers:</strong> In some cases, we will
                    employ or use service providers such as consultants, and
                    temporary workers, third party software developers, to
                    complete a business process or provide a service on our
                    behalf. For example, we may use service providers to enhance
                    our technology, deliver products, or to send Emails. When we
                    employ service providers, we may need to share your
                    personally identifiable information. Service providers are
                    strictly prohibited from using your personally identifiable
                    information for purposes other than to act on our behalf.
                  </ListItem>
                  <ListItem>
                    <strong>Service Alerts And Critical Notices:</strong>{' '}
                    Although we respect and honor the privacy preferences you
                    have expressed, we may need to contact you to inform you of
                    specific changes that may impact your ability to use this
                    service or for other critical non-marketing purposes, such
                    as bug alerts. We may also contact you to respond to your
                    specific requests, to clarify the order information you
                    provided to us, or to notify you of upcoming subscription
                    expiration dates.
                  </ListItem>
                  <ListItem>
                    <strong>Change Of Control:</strong> Your personally
                    identifiable information may be transferred in connection
                    with a sale, merger, transfer, exchange or other disposition
                    (whether of assets, stock or otherwise) of all or a portion
                    of a business of Rocket Auto. You will have the opportunity
                    to opt out of further secondary use of your information
                    following any change of control.
                  </ListItem>
                  <ListItem>
                    <strong>Changes To Our Privacy Policy:</strong> If we plan
                    to make significant changes to any of our privacy policies
                    or practices with respect to how we use personally
                    identifiable information, {"we'll"} post those changes to
                    our website 30 days before they take effect.
                  </ListItem>
                  <ListItem>
                    <strong>Legal Disclosures:</strong> In some cases we may
                    disclose certain information to comply with a legal process,
                    such as a court order, subpoena, search warrant, or law
                    enforcement request.
                  </ListItem>
                </UnorderedList>
                <BoxH2>
                  We Work Hard To Protect Your Data From Loss, Misuse and
                  Unauthorized Changes
                </BoxH2>
                <BoxBody>
                  We use industry-recognized security safeguards to protect your
                  data. We secure all data from loss, misuse and unauthorized
                  changes. We protect your data using industry-standard security
                  products and protocols, as well as carefully developed
                  security procedures. Our security measures are reviewed on a
                  regular basis by both our internal team members and outside
                  security specialists.
                </BoxBody>
                <BoxBody mb={1}>
                  We also hold our team members responsible for keeping your
                  data safe. Here are some ways we do that:
                </BoxBody>
                <UnorderedList mb={4}>
                  <ListItem>
                    We require all team members to take regular training and
                    sign a written statement acknowledging their compliance with
                    our security protocols.
                  </ListItem>
                  <ListItem>We enforce strict password protocols.</ListItem>
                  <ListItem>
                    We require strict authentication and authorization for team
                    members to use, view or change information.
                  </ListItem>
                </UnorderedList>
                <BoxH2>We Tell You How And Why We Use Web Technologies</BoxH2>
                <BoxBody mb={1}>
                  Here is how and why we use some common Web technologies to
                  help manage our websites:
                </BoxBody>
                <UnorderedList>
                  <ListItem>
                    <strong>Cookies:</strong> A {'"cookie"'} is a small piece of
                    information that our website may provide to your browser
                    while you are at our sites. Our website supplies your
                    browser with cookies that contain a unique identifier used
                    to better understand website usage in the aggregate and on
                    an individual level so we know what areas of our site users
                    prefer (e.g., based on the number of visits to those areas).
                    This is done through a tracking utility that allows us, for
                    example, to reconstruct activity from a session or by a
                    user, for troubleshooting and issue resolution purposes. We
                    may also employ service providers to help us collect and
                    understand our website usage data.
                  </ListItem>
                </UnorderedList>
                <BoxBody>
                  When periodic surveys are presented to website visitors,
                  cookies are used to prevent issuing multiple invitations to
                  the same individual.
                </BoxBody>
                <BoxBody>
                  Additionally, our service providers that serve ads on
                  affiliate and/or advertiser websites may assign different
                  cookies and small graphical images called single-pixel GIFs or
                  web beacons, to your browser to track the effectiveness of our
                  advertising on other websites and your involvement with us.
                  Service providers report data in the aggregate and do not link
                  it to individual customer information. We may also employ
                  service providers who may assign cookies or web beacons to
                  your browser to assist us in collecting website usage data
                  such as your IP address, session ID, URL and demographic
                  information such as your zip code. The collection of data may
                  include personally identifiable information. We do not track
                  URLs that you type into your browser, nor do we track you
                  across the Internet once you leave our site.
                </BoxBody>
                <BoxBody>
                  If you simply want to browse, you do not have to accept
                  cookies from our site. Should you decide, however, that you
                  would like to register and sign in to special areas of the
                  website and you have modified your browser settings not to
                  accept cookies, you will need to re-set your browser to accept
                  the cookies that we send. Otherwise, you {"won't"} be able to
                  participate in certain areas of the website. Most browsers are
                  defaulted to accept and maintain cookies.
                </BoxBody>
                <BoxBody mb={1}>
                  If you wish to remove cookies provided by Rocket Auto, please
                  check your {"browser's"} settings and Help section for
                  instructions for removing cookies from your browser.
                </BoxBody>
                <UnorderedList mb={4}>
                  <ListItem>
                    <strong>Website Usage Data:</strong> Our website tracks
                    usage data, including, for example, your IP address, your
                    browser type and version, which pages you view, which page,
                    if any, linked you to our site, and which link, if any, you
                    follow off of our site. We use this data in the aggregate
                    and on an individual level to better understand website
                    activity to improve our site offerings, to reconstruct
                    activity from a session or by a user, for troubleshooting
                    and issue resolution purposes. We may also use this data to
                    provide you a more personalized website experience,
                    assistance with technical support questions, and to send you
                    special offers, product and service updates, or other
                    promotional materials that are relevant and tailored to your
                    interests. We do not share your information with outside
                    companies for their promotional use. We do not track URLs
                    that you type into your browser, nor do we track you across
                    the Internet once you leave our site.
                  </ListItem>
                  <ListItem>
                    <strong>
                      Social Media And Third-Party Website Security And Privacy
                      Policies:
                    </strong>{' '}
                    Rocket Auto currently has presence on social media to
                    connect with and market to the public, our customers. Your
                    activity on third-party websites is governed by the security
                    and privacy policies of each third-party website. Users of
                    third-party websites often share information with the
                    general public, user community, and/or the third-party
                    operating the third-party website, which may use this
                    information in a variety of ways. Consequently, you should
                    review the privacy policies of the third-party website
                    before using it and ensure that you understand how this
                    information may be used. You may be able to adjust privacy
                    settings on your accounts on any third-party website or
                    application to match your preferences. The information
                    posted on social media is generally available to the public.
                    To protect your privacy, do not include information you want
                    to keep private or any other sensitive personal information
                    in your social media activity, comments or responses. This
                    information may be archived independently on, and retention
                    of such information is governed by, the third-party website.
                  </ListItem>
                  <ListItem>
                    <strong>Browser “Do Not Track” And Other Settings:</strong>{' '}
                    You may be using an Internet browser that has the ability to
                    communicate your privacy preferences to the website,
                    including requests not to track your usage and browsing
                    history. Currently, our websites do not respond to any of
                    these signals. We may track your activity on these websites
                    and use that information as provided in this policy.
                  </ListItem>
                </UnorderedList>
                <BoxH2>
                  We Give You Choices About How The Personally Identifiable
                  Information That You Provide To Us May Be Used
                </BoxH2>
                <BoxBody>
                  We give you the opportunity to control the use of your
                  personal information for purposes other than to fulfill your
                  request or as is required to process, close and subsequently
                  service your loan. For example, on occasion we may use your
                  contact information to send you promotional communications
                  about our products. If you do not wish to receive such
                  communications, you may{' '}
                  <a href="mailto:Help@RocketAuto.com">contact us</a>.
                </BoxBody>
                <BoxBody>Your Rights:</BoxBody>
                <BoxBody mb={1}>
                  <strong>Sale Of Data</strong>
                </BoxBody>
                <BoxBody>We {'don’t'} sell your data.</BoxBody>
                <BoxBody mb={1}>
                  <strong>Your Privacy Rights</strong>
                </BoxBody>
                <BoxBody>
                  If you’d like to review, access, revise or delete personal
                  data we’ve collected about you, please contact us.
                </BoxBody>
                <BoxBody mb={1}>
                  <strong>Right To Know</strong>
                </BoxBody>
                <BoxBody>
                  You have a right to know what personal data we’ve collected
                  about you, what data we’ve sold, who we’ve sold your data to,
                  and what data we’ve shared for business purposes. To exercise
                  this right, please contact us.
                </BoxBody>
                <BoxBody mb={1}>
                  <strong>Right To Access</strong>
                </BoxBody>
                <BoxBody>
                  You have the right to see what specific pieces of data we have
                  about you, and to get this data in a portable and easily
                  accessible format. To exercise this right, please contact us.
                </BoxBody>
                <BoxBody mb={1}>
                  <strong>Right To Delete</strong>
                </BoxBody>
                <BoxBody mb={4}>
                  You have the right to request that we delete your data. We’re
                  legally required to keep some data about you, but we’ll delete
                  everything we can. Keep in mind that we might reacquire some
                  of your data if we purchase data from a third party. To
                  exercise this right, please{' '}
                  <a href="mailto:Help@RocketAuto.com">contact us</a>.
                </BoxBody>
                <BoxH2>
                  We Provide Various Ways For You To Contact Us About Our
                  Information Practices And Other Aspects Of Privacy
                </BoxH2>
                <BoxBody>
                  <em>How To Contact Us About Your Data</em>
                </BoxBody>
                <BoxBody mb={1}>
                  <strong>By Phone</strong>
                </BoxBody>
                <BoxBody>
                  <a href="tel:+1(800)3385240">800-338-5240</a>
                </BoxBody>
                <BoxBody mb={1}>
                  <strong>By Mail</strong>
                </BoxBody>
                <BoxBody mb={0}>Write to this address:</BoxBody>
                <BoxBody>
                  1900 St. Antoine
                  <br /> Detroit, MI 48226
                </BoxBody>
                <BoxBody mb={1}>
                  <strong>By Email</strong>
                </BoxBody>
                <BoxBody>
                  <a href="mailto:help@rocketauto.com">help@rocketauto.com</a>
                </BoxBody>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <PoweredByFooter />
    </>
  );
};

export default PrivacyPolicy;
