import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  Search, 
  AlertTriangle, 
  Users, 
  Award,
  FileCheck,
  BadgeCheck,
  XCircle,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HowWeVerify = () => {
  const baseUrl = "https://www.gunnstakes.store";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "How We Verify",
        "item": `${baseUrl}/how-we-verify`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How GUNN STAKES Verifies Sweepstakes - Our 24-Hour Process",
    "description": "Learn about our rigorous 24-hour manual verification process that ensures every sweepstake on GUNN STAKES is legitimate, safe, and worth your time.",
    "author": {
      "@type": "Organization",
      "name": "GUNN STAKES"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GUNN STAKES",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.png`
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  const verificationSteps = [
    {
      icon: Search,
      title: "Source Investigation",
      description: "We trace every sweepstake back to its original sponsor. We verify the company exists, has a legitimate business presence, and has a history of honoring prize commitments.",
      details: ["Company registration verification", "Business history review", "Previous winner confirmation"]
    },
    {
      icon: FileCheck,
      title: "Official Rules Review",
      description: "Our team reads the complete official rules for every sweepstake. We ensure there are no hidden fees, unreasonable requirements, or deceptive practices.",
      details: ["No purchase necessary verification", "Entry method validation", "Prize distribution terms check"]
    },
    {
      icon: Shield,
      title: "Security & Privacy Check",
      description: "We analyze the entry process and website security. We never list sweepstakes that ask for sensitive information like SSN, bank details, or excessive personal data.",
      details: ["SSL certificate verification", "Data collection policy review", "Third-party security assessment"]
    },
    {
      icon: Users,
      title: "Community Feedback Analysis",
      description: "We monitor sweepstakes forums, social media, and our own user reports to identify any red flags or complaints about sponsors.",
      details: ["Social media sentiment analysis", "Forum discussion monitoring", "User report investigation"]
    }
  ];

  const scamIndicators = [
    "Requests for payment or 'processing fees'",
    "Asks for bank account or credit card details",
    "Requires Social Security Number",
    "No clear sponsor or company information",
    "Unusually high prize with no legitimate source",
    "Pressure tactics or urgent deadlines",
    "No official rules or terms available",
    "Suspicious website with poor security"
  ];

  const differentiators = [
    {
      icon: Clock,
      title: "24-Hour Verification Window",
      description: "Every sweepstake goes through our full verification process before listing. We don't rush - your safety is worth the wait."
    },
    {
      icon: BadgeCheck,
      title: "Manual Expert Review",
      description: "No automated scrapers here. Real humans review every single sweepstake, reading official rules and investigating sponsors personally."
    },
    {
      icon: AlertTriangle,
      title: "Active Scam Blocking",
      description: "We've blocked over 340 scam sweepstakes this year alone. Our database of known bad actors helps us catch fraudulent offers before they reach you."
    },
    {
      icon: Award,
      title: "Winner Verification",
      description: "We track and verify real winners from our listed sweepstakes. This helps us maintain relationships with legitimate sponsors."
    },
    {
      icon: Sparkles,
      title: "Daily Updates",
      description: "We don't just add new sweepstakes - we actively remove expired ones and re-verify ongoing promotions to ensure accuracy."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>How We Verify Sweepstakes | GUNN STAKES</title>
        <meta name="description" content="Learn about GUNN STAKES' rigorous 24-hour manual verification process. We check every sweepstake for legitimacy, security, and real prize delivery." />
        <link rel="canonical" href={`${baseUrl}/how-we-verify`} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Header */}
      <header className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Sweepstakes
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-primary/20 rounded-2xl">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">How We Verify</h1>
              <p className="text-lg text-muted-foreground">Our 24-Hour Manual Verification Process</p>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            At GUNN STAKES, we believe you deserve to enter sweepstakes with confidence. 
            That's why every single listing goes through our rigorous verification process 
            before appearing on our site.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Trust Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Card className="text-center bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-primary">847+</p>
              <p className="text-sm text-muted-foreground">Verified Sweepstakes</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-primary">342</p>
              <p className="text-sm text-muted-foreground">Scams Blocked</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-primary">24hr</p>
              <p className="text-sm text-muted-foreground">Verification Time</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Scam Catch Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Verification Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our 4-Step Verification Process</h2>
          <div className="space-y-6">
            {verificationSteps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-card border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-3">
                      <step.icon className="h-6 w-6 text-primary" />
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Scam Detection */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">How We Detect Scams</h2>
          <p className="text-muted-foreground mb-8">
            Our team is trained to identify the warning signs of fraudulent sweepstakes. 
            Here's what gets a sweepstake immediately rejected:
          </p>
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="pt-6">
              <ul className="grid md:grid-cols-2 gap-3">
                {scamIndicators.map((indicator, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span>{indicator}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">What Makes GUNN STAKES Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((diff, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <diff.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{diff.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{diff.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparison with Competitors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">GUNN STAKES vs. Generic Listing Sites</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4 bg-primary/10">GUNN STAKES</th>
                  <th className="text-center py-4 px-4">Generic Sites</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Manual Verification", true, false],
                  ["24-Hour Review Process", true, false],
                  ["Scam Blocking Database", true, false],
                  ["Winner Verification", true, false],
                  ["Daily Updates", true, "Sometimes"],
                  ["Official Rules Review", true, false],
                  ["Sponsor Investigation", true, false],
                  ["100% Free to Use", true, true]
                ].map(([feature, us, them], index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{feature}</td>
                    <td className="py-3 px-4 text-center bg-primary/5">
                      {us === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">{us}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {them === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : them === false ? (
                        <XCircle className="h-5 w-5 text-destructive mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">{them}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Winning?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Browse our verified sweepstakes with confidence. Every listing has been 
            manually reviewed to ensure it's legitimate, safe, and worth your time.
          </p>
          <Link to="/">
            <Button size="lg" className="text-lg px-8">
              Browse Verified Sweepstakes
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-muted-foreground">
          <p>
            Have questions about our verification process?{" "}
            <a href="mailto:support@gunnstakes.store" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HowWeVerify;
