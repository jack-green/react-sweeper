import React from 'react';

export default function gameMenu(settings: any) {
  return [
    {
      id: 'game',
      label: (
        <span>
          <u>G</u>
          ame
        </span>
      ),
      children: [
        {
          id: 'new',
          label: (
            <span>
              <u>N</u>
              ew
            </span>
          ),
          shortcut: 'F2',
        },
        {
          divider: true,
        },
        {
          id: 'beginner',
          label: (
            <span>
              <u>B</u>
              eginner
            </span>
          ),
          checked: settings.width === 8
            && settings.height === 8
            && settings.mines === 10,
        },
        {
          id: 'intermediate',
          label: (
            <span>
              <u>I</u>
              ntermediate
            </span>
          ),
          checked: settings.width === 16
            && settings.height === 16
            && settings.mines === 40,
        },
        {
          id: 'expert',
          label: (
            <span>
              <u>E</u>
              xpert
            </span>
          ),
          checked: settings.width === 30
            && settings.height === 16
            && settings.mines === 99,
        },
        {
          id: 'custom',
          label: (
            <span>
              <u>C</u>
              ustom...
            </span>
          ),
        },
        {
          divider: true,
        },
        {
          id: 'marks',
          label: (
            <span>
              <u>M</u>
              arks (?)
            </span>
          ),
          checked: settings.allowMarks,
        },
        {
          id: 'color',
          label: (
            <span>
              Co
              <u>l</u>
              or
            </span>
          ),
          checked: settings.useColor,
        },
        {
          divider: true,
        },
        {
          id: 'best-times',
          label: (
            <span>
              Best
              {' '}
              <u>T</u>
              imes
            </span>
          ),
        },
        {
          divider: true,
        },
        {
          id: 'exit',
          label: (
            <span>
              E
              <u>x</u>
              it
            </span>
          ),
        },
      ],
    },
    {
      id: 'help',
      label: (
        <span>
          <u>H</u>
          elp
        </span>
      ),
      children: [
        {
          id: 'help-topics',
          label: (
            <span>
              <u>H</u>
              elp Topics
            </span>
          ),
        },
        {
          id: 'about',
          label: (
            <span>
              <u>A</u>
              bout Reactsweeper
            </span>
          ),
        },
      ],
    },
  ];
}
