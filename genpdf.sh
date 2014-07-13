#!/bin/bash

# The output of this tends to look uglier.
#pandoc --toc -H TM_Requirements.sty -r markdown_github -o \
#       TM_Requirements.pdf Requirements.md

#pandoc --toc -H TM_Requirements.sty -r markdown+pipe_tables -o \
#       TM_Requirements.pdf Requirements.md

# Solve problem of figures appearing before text due to default "float"
# behavior of 'figure' environment.

# Solution from: http://tex.stackexchange.com/a/142403
#
# Context: http://tex.stackexchange.com/questions/101725/
#                 latex-figures-appear-before-text-in-pandoc-markdown
pandoc --toc -H TM_Requirements.sty -r markdown+pipe_tables -w latex -o \
       TM_Requirements.tex Requirements.md
sed  -i '' 's/begin{figure}\[htbp\]/begin{figure}\[H\]/g' TM_Requirements.tex 

# 'pdflatex' doesn't create the table of contents like Pandoc does.
pdflatex TM_Requirements.tex

# But Pandoc seems to clobber the changes made by sed, above 
# 
# pandoc --toc -H TM_Requirements.sty -r latex -o TM_Requirements.pdf \
#	   TM_Requirements.tex

# Clean up pdflatex's heap of refuse
if which latexmk >/dev/null 2>&1; then
   latexmk -c  && rm -f TM_Requirements.tex
else
    rm -f TM_Requirements.aux TM_Requirements.log TM_Requirements.out \
          TM_Requirements.tex TM_Requirements.toc
fi
