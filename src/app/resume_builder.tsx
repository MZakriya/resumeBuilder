'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Download, Upload } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ResumeBuilder() {
  const [cvData, setCvData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    aboutMe: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    picture: null as string | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCvData(prevData => ({ ...prevData, [name]: value }))
  }

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCvData(prevData => ({ ...prevData, picture: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadTxt = () => {
    const content = `
Name: ${cvData.name}
Email: ${cvData.email}
Phone: ${cvData.phone}
Address: ${cvData.address}

About Me:
${cvData.aboutMe}

Professional Summary:
${cvData.summary}

Experience:
${cvData.experience}

Education:
${cvData.education}

Skills:
${cvData.skills}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cv.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadPdf = () => {
    // Mock PDF download (in a real application, you'd use a library like react-pdf)
    alert('PDF download functionality would be implemented here.')
  }

  return (
    <div className="min-h-screen bg-indigo-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8 text-center">CV Builder</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-700">Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/3">
                  <Label htmlFor="picture" className="text-indigo-600">Picture</Label>
                  <div className="mt-1 flex items-center justify-center w-full h-40 bg-indigo-100 border-2 border-dashed border-indigo-300 rounded-lg overflow-hidden">
                    {cvData.picture ? (
                      <img src={cvData.picture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <Label htmlFor="picture-upload" className="cursor-pointer flex flex-col items-center justify-center">
                        <Upload className="w-8 h-8 text-indigo-500" />
                        <span className="mt-2 text-sm text-indigo-600">Upload Photo</span>
                        <Input id="picture-upload" type="file" accept="image/*" className="hidden" onChange={handlePictureUpload} />
                      </Label>
                    )}
                  </div>
                </div>
                <div className="w-2/3">
                  <Label htmlFor="aboutMe" className="text-indigo-600">About Me</Label>
                  <Textarea id="aboutMe" name="aboutMe" value={cvData.aboutMe} onChange={handleInputChange} className="mt-1 h-40" />
                </div>
              </div>
              <div>
                <Label htmlFor="name" className="text-indigo-600">Name</Label>
                <Input id="name" name="name" value={cvData.name} onChange={handleInputChange} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-indigo-600">Email</Label>
                  <Input id="email" name="email" type="email" value={cvData.email} onChange={handleInputChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="address" className="text-indigo-600">Address</Label>
                  <Input id="address" name="address" value={cvData.address} onChange={handleInputChange} className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="text-indigo-600">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={cvData.phone} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="summary" className="text-indigo-600">Professional Summary</Label>
                <Textarea id="summary" name="summary" value={cvData.summary} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="experience" className="text-indigo-600">Work Experience</Label>
                <Textarea id="experience" name="experience" value={cvData.experience} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="education" className="text-indigo-600">Education</Label>
                <Textarea id="education" name="education" value={cvData.education} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="skills" className="text-indigo-600">Skills</Label>
                <Textarea id="skills" name="skills" value={cvData.skills} onChange={handleInputChange} className="mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-700">CV Preview</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="flex gap-4 mb-4">
                {cvData.picture && (
                  <img src={cvData.picture} alt="Profile" className="w-32 h-32 object-cover rounded-lg" />
                )}
                <div>
                  <h2 className="text-xl font-bold text-indigo-800">{cvData.name}</h2>
                  <p className="text-indigo-600">{cvData.email} | {cvData.phone}</p>
                  <p className="text-indigo-600">{cvData.address}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-indigo-700 mt-4">About Me</h3>
              <p className="text-indigo-900">{cvData.aboutMe}</p>
              <h3 className="text-lg font-semibold text-indigo-700 mt-4">Professional Summary</h3>
              <p className="text-indigo-900">{cvData.summary}</p>
              <h3 className="text-lg font-semibold text-indigo-700 mt-4">Work Experience</h3>
              <p className="text-indigo-900 whitespace-pre-line">{cvData.experience}</p>
              <h3 className="text-lg font-semibold text-indigo-700 mt-4">Education</h3>
              <p className="text-indigo-900 whitespace-pre-line">{cvData.education}</p>
              <h3 className="text-lg font-semibold text-indigo-700 mt-4">Skills</h3>
              <p className="text-indigo-900 whitespace-pre-line">{cvData.skills}</p>
            </CardContent>
            <div className="flex justify-end p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={downloadTxt}>
                    Download as .txt
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={downloadPdf}>
                    Download as .pdf
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}